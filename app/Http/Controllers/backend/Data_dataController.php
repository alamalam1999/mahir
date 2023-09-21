<?php

namespace App\Http\Controllers\backend;

use App\Http\Controllers\Controller;
use App\Models\data_departemen;
use App\Models\data_harta_tetap;
use App\Models\data_mata_uang;
use App\Models\data_nama_alamat;
use App\Models\data_pajak;
use App\Models\data_proyek;
use App\Models\data_rekening;
use Illuminate\Http\Request;

class Data_dataController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index() {
        //
        return view('dashboard.data-data');
    }

    public function data_nama_alamat() {
        $data = data_nama_alamat::where('name','!=','null')->paginate( 5 );
        return view('dashboard.data_nama_alamat.data_nama_alamat', ['data' => $data]);
    }

    public function data_rekening() {
        $data = data_rekening::where('nama_rekening_dari','!=','null')->paginate( 5 );
        return view('dashboard.data_rekening.data_rekening', ['data' => $data]);
    }

    public function data_mata_uang() {
        $data = data_mata_uang::where('nama_mata_uang','!=','null')->paginate( 5 );
        return view('dashboard.data_mata_uang.data_mata_uang', ['data' => $data]);
    }

    public function data_proyek() {
        $data = data_proyek::where('nama_proyek','!=','null')->paginate(5);
        return view('dashboard.data_proyek.data_proyek', ['data' => $data]);
    }

    public function data_pajak() {
        $data = data_pajak::where('nama_pajak','!=','null')->paginate(5);
        return view('dashboard.data_pajak.data_pajak', ['data' => $data]);
    }

    public function data_departemen() {
        $data = data_departemen::where('nama_departemen','!=','null')->paginate(5);
        return view('dashboard.data_departemen.data_departemen', ['data' => $data]);
    }

    public function data_harta_tetap() {
        $data = data_harta_tetap::where('pemilik_harta','!=','null')->paginate(5);
        return view('dashboard.data_harta_tetap.data_harta_tetap', ['data' => $data]);
    }
}
