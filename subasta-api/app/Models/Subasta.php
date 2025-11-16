<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Subasta extends Model
{
    protected $fillable = [
        'nombre_vendedor',
        'descripcion',
        'precio_inicial',
        'fecha_realizacion',
    ];

    public function ofertas(): HasMany
    {
        return $this->hasMany(Oferta::class)->orderBy('monto', 'desc');
    }
}
