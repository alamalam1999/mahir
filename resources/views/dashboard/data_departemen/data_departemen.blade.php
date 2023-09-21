@extends('dashboard.base')

@section('content')

        <div class="container-fluid">
          <div class="animated fadeIn">
            <div class="row">
              <div class="col-sm-12 col-md-12 col-lg-12 col-xl-12">
                <div class="card">
                    <div class="card-header">
                      <i class="fa fa-align-justify"></i>notes</div>
                    <div class="card-body">
                        <div class="row"> 
                          <a href="notes" class="btn btn-primary m-2">{{ __('Add Note') }}</a>
                        </div>
                        <br>
                        <table class="table table-responsive-sm table-striped">
                        <thead>
                          <tr>
                            <th>Nama Departemen</th>
                            <th>Jenis Departemen</th>
                            <th>Jumlah Karyawan Departemen</th>
                            <th>Tahun Pembuatan Departemen</th>
                            <th>Nama Kepala Departemen</th>
                            <th>Deskripsi</th>
                          </tr>
                        </thead>
                        <tbody>
                          @foreach($data as $datas)
                            <tr>
                              <td><strong>{{ $datas->nama_departemen }}</strong></td>
                              <td><strong>{{ $datas->jenis_departemen }}</strong></td>
                              <td>{{ $datas->jumlah_karyawan_departemen }}</td>
                              <td>{{ $datas->tahun_pembuatan_departemen }}</td>
                              <td>{{ $datas->nama_kepala_departemen }}</td>
                              <td><strong>{{ $datas->deskripsi }}</strong></td>
                            </tr>
                          @endforeach
                        </tbody>
                      </table>
                      {{ $data->links() }}
                    </div>
                </div>
              </div>
            </div>
          </div>
        </div>

@endsection


@section('javascript')

@endsection

