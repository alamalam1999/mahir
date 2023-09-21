<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class DataRekening extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('data_rekening', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('nama_rekening_dari');
            $table->string('rekening_dari')->nullable();
            $table->string('rekening_tujuan')->nullable();
            $table->string('nama_rekening_tujuan');
            $table->bigInteger('nominal');
            $table->bigInteger('biaya_transfer');
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
        Schema::dropIfExists('data_rekening');
    }
}
