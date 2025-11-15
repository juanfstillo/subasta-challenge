<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Subasta;
use Illuminate\Support\Facades\Validator;

class SubastaController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Subasta::all();
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // Validación simple (podés mover esto a un Form Request)
        $validador = Validator::make($request->all(), [
            'nombre_vendedor' => 'required|string|max:255',
            'descripcion' => 'required|string',
            'precio_inicial' => 'required|numeric|min:0',
            'fecha_realizacion' => 'required|date'
        ]);

        if ($validador->fails()) {
            return response()->json($validador->errors(), 422);
        }

        $subasta = Subasta::create($validador->validated());

        return response()->json($subasta, 201); // 201 = Creado
    }

    /**
     * Display the specified resource.
     */
    public function show(Subasta $subasta)
    {
        return response()->json($subasta);
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
