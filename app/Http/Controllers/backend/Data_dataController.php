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
        return view('dashboard.data-data');
    }

    public function data_nama_alamat() {
        $data = data_nama_alamat::where('deleted_at','=',null)->paginate( 5 );
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

    public function add_data_alamat() {    
        return view('dashboard.data_nama_alamat.add_data_alamat');
    }

    public function tambah_data_alamat(Request $request) {   
        $checkresponse = data_nama_alamat::insert([
            'name'              => $request->name,
            'provinsi'          => $request->provinsi,
            'kabupaten'         => $request->kabupaten,
            'daerah'            => $request->daerah,
            'no_hp'             => $request->no_hp,
            'email'             => $request->email,
            'no_telepon'        => $request->no_telepon
        ]);
        if (!empty($checkresponse)) {
			return
				response()->json(['success' => true, 'message' => 'Data Berhasil Dimasukkan']);
		}      
        //return redirect()->back() ->with('alert', 'Pendaftaran tidak berhasil ,silahkan coba kembali \n ');
    }

    public function edit_data_alamat($id) {
        $checkstatus = data_nama_alamat::where('id', $id)->first();
        return view('dashboard.data_nama_alamat.edit_data_alamat', ['checkstatus' => $checkstatus]);
    }

    public function delete_data_alamat(Request $request) {

        date_default_timezone_set('Asia/Jakarta');
		$checkstatus = data_nama_alamat::where('id', $request->id)
		->update([
			'deleted_at' => date("Y-m-d H:i:s")
			]);
          
            if($checkstatus) {
                return response()->json(['success' => true, 'message' => 'Berhasil dihapus']);
            }
    }

    public function update_data_alamat(Request $request) {
        $checkresponse = data_nama_alamat::where('id', $request->id_data)
        ->update([
            'name'              => $request->name,
            'provinsi'          => $request->provinsi,
            'kabupaten'         => $request->kabupaten,
            'daerah'            => $request->daerah,
            'no_hp'             => $request->no_hp,
            'email'             => $request->email,
            'no_telepon'        => $request->no_telepon
			]);

        if (!empty($checkresponse)) {
			return
				response()->json(['success' => true, 'message' => 'Data Berhasil Di Update']);
		} 
    }

}
