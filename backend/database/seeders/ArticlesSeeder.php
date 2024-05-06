<?php
namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Faker\Factory as Faker;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class ArticlesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $faker = Faker::create();
        $userIds = DB::table('users')->pluck('id')->toArray();
        $categoryIds = DB::table('categories')->pluck('id')->toArray();

        $userId = $faker->randomElement($userIds);
        $categoryId = $faker->randomElement($categoryIds);

        $title = $faker->sentence;
        $slug = Str::slug($title, '-');

        $count = DB::table('articles')->where('slug', $slug)->count();
        if ($count > 0) {
            $suffix = 2;
            while (DB::table('articles')->where('slug', $slug . '-' . $suffix)->count() > 0) {
                $suffix++;
            }
            $slug .= '-' . $suffix;
        }

        DB::table('articles')->insert([
            'title' => $title,
            'content' => $faker->paragraph(5),
            'user_id' => $userId,
            'category_id' => $categoryId,
            'slug' => $slug,
        ]);
    }
}