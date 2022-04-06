<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class DrillFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            [
                'title' => 'お試し',
                'user_id' => 1,
                'problem0' => 'Thisispen',
                'problem1' => 'She is mother',
                'problem2' => 'your cat',
            ],
            [
                'title' => 'テスト',
                'user_id' => 1,
                'problem0' => 'create_react app',
                'problem1' => 'php artisan db:seed',
                'problem2' => 'docker-compose',
            ]
        ];
    }
}
