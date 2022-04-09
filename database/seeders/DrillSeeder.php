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
                'title' => '初級問題その１',
                'problem_num' => 3,
                'user_id' => 1,
            ],
            [
                'title' => '中級問題その１',
                'problem_num' => 4,
                'user_id' => 1,
            ]
        ]);
    }
}
