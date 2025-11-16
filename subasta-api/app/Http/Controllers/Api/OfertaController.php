<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Models\Subasta;
use App\Events\NuevaOfertaRegistrada;

class OfertaController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request, Subasta $subasta)
    {
        // 1. Calcular el precio base (precio inicial o la oferta más alta)
        $precioBase = $subasta->ofertas()->max('monto') ?? $subasta->precio_inicial;

        // 2. Validar
        $validador = Validator::make($request->all(), [
            'dni' => 'required|string|max:20',
            // El monto debe ser numérico Y mayor que el precio base por eso greater than (gt)
            'monto' => "required|numeric|gt:{$precioBase}",
        ]);

        if ($validador->fails()) {
            return response()->json($validador->errors(), 422); // 422 = Error de validación
        }

        // 3. Guardar la oferta
        $oferta = $subasta->ofertas()->create($validador->validated());
        $subasta->precio_actual = $oferta->monto;
        $subasta->save();
        // 4.Transmitir el evento por el socket
        // Esto enviará la $oferta a todos los que escuchen 'subasta.X'
        broadcast(new NuevaOfertaRegistrada($oferta));
        return response()->json($oferta, 201); // 201 = Creado
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
