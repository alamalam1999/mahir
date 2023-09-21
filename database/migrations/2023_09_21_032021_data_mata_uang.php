<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class DataMataUang extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('data_mata_uang', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('nama_mata_uang');
            $table->string('jenis_mata_uang')->nullable();
            $table->string('pecahan_uang')->nullable();
            $table->string('tahun_pecahan');
            $table->string('dari_bank_apa');
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
        Schema::dropIfExists('data_mata_uang');
    }
}
