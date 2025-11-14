<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Oferta extends Model
{
    protected $fillable = [
        'subasta_id',
        'dni',
        'monto',
    ];

    public function subasta(): BelongsTo
    {
        return $this->belongsTo(Subasta::class);
    }
}
