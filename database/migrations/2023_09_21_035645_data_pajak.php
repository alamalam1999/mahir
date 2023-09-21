<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class DataPajak extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('data_pajak', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('nama_pajak');
            $table->string('jenis_pajak')->nullable();
            $table->string('tipe_pajak')->nullable();
            $table->string('tahun_berakhir_pajak');
            $table->string('tahun_pembayaran_pajak');
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
        Schema::dropIfExists('data_pajak');
    }
}
