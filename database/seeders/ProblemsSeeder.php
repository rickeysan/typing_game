<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ProblemsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('problems')->insert([
            [
                'drill_id' => 1,
                'content' => 'cat'
            ],
            [
                'drill_id' => 1,
                'content' => 'dog'
            ], [
                'drill_id' => 1,
                'content' => 'Lion'
            ],
            [
                'drill_id' => 2,
                'content' => 'apple'
            ],
            [
                'drill_id' => 2,
                'content' => 'grape!!'
            ],
            [
                'drill_id' => 2,
                'content' => 'tomato123'
            ],

        ]);
    }
}
