<?php

namespace App\Http\Controllers\backend;

use App\Http\Controllers\Controller;
use App\Models\data_nama_alamat;
use App\Models\data_rekening;
use Illuminate\Http\Request;

class Data_dataController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
        return view('dashboard.data-data');
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }

    public function data_nama_alamat() {
        $data = data_nama_alamat::where('name','!=','null')->paginate( 5 );
        return view('dashboard.data_nama_alamat.data_nama_alamat', ['data' => $data]);
    }

    public function data_rekening() {
        $data = data_rekening::where('nama_rekening_dari','!=','null')->paginate( 5 );
        return view('dashboard.data_rekening.data_rekening', ['data' => $data]);
    }
}
