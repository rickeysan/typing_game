<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Drill extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'user_id',
        'problem0',
        'problem1',
        'problem2',
    ];
}
