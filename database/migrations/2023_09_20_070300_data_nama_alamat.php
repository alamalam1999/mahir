<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class DataNamaAlamat extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('data_nama_alamat', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('name');
            $table->string('provinsi')->nullable();
            $table->string('kabupaten')->nullable();
            $table->string('daerah');
            $table->bigInteger('no_hp');
            $table->string('email');
            $table->bigInteger('no_telepon');
            $table->timestamps();
            $table->timestamp('deleted_at');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('data_nama_alamat');
    }
}
