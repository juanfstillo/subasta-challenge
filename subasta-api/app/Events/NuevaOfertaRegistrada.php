<?php

namespace App\Events;

use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;
use App\Models\Oferta;

class NuevaOfertaRegistrada implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public Oferta $oferta;
    /**
     * Create a new event instance.
     */
    public function __construct(Oferta $oferta)
    {
        $this->oferta = $oferta;
    }

    /**
     * Get the channels the event should broadcast on.
     *
     * @return array<int, \Illuminate\Broadcasting\Channel>
     */
    public function broadcastOn(): array
    {
        return [
            new Channel('nueva-subasta.' . $this->oferta->subasta_id), // seria nueva-subasta.1
        ];
    }


    /* Define la conexión de broadcast que debe usarse.
     */
    public function broadcastConnection(): string
    {
        return 'reverb';
    }
}
