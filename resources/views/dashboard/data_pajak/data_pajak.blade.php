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
                            <th>Nama Pajak</th>
                            <th>Jenis Pajak</th>
                            <th>Tipe Pajak</th>
                            <th>Tahun Berakhir Pajak</th>
                            <th>Tahun Pembayaran Pajak</th>
                            <th>Deskripsi</th>
                          </tr>
                        </thead>
                        <tbody>
                          @foreach($data as $datas)
                            <tr>
                              <td><strong>{{ $datas->nama_pajak }}</strong></td>
                              <td><strong>{{ $datas->jenis_pajak }}</strong></td>
                              <td>{{ $datas->tipe_pajak }}</td>
                              <td>{{ $datas->tahun_berakhir_pajak }}</td>
                              <td>{{ $datas->tahun_pembayaran_pajak }}</td>
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

