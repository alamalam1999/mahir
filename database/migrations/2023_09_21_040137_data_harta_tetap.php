<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class DataHartaTetap extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('data_harta_tetap', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('pemilik_harta');
            $table->string('jenis_harta')->nullable();
            $table->string('asal_harta')->nullable();
            $table->string('tahun_harta');
            $table->string('pengurus_harta');
            $table->string('no_hp');
            $table->string('email');
            $table->string('deskripsi');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('data_harta_tetap');
    }
}
