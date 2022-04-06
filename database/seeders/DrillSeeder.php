<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class DrillSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('drills')->insert([
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
        ]);
    }
}
