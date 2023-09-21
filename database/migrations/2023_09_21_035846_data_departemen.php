<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class DataDepartemen extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('data_departemen', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('nama_departemen');
            $table->string('jenis_departemen')->nullable();
            $table->string('jumlah_karyawan_departemen')->nullable();
            $table->string('tahun_pembuatan_departemen');
            $table->string('nama_kepala_departemen');
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
        Schema::dropIfExists('data_departemen');
    }
}
