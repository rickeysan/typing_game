<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Problems;

class Drill extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'user_id',
    ];
    public function problems()
    {
        return $this->hasMany(Problems::class);
    }
}
