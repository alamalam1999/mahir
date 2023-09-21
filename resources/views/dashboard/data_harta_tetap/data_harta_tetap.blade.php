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
                            <th>Pemilik Harta</th>
                            <th>Jenis Harta</th>
                            <th>Asal Harta</th>
                            <th>Tahun Harta</th>
                            <th>Pengurus Harta</th>
                            <th>No Hp</th>
                            <th>Email</th>
                            <th>Deskripsi</th>
                          </tr>
                        </thead>
                        <tbody>
                          @foreach($data as $datas)
                            <tr>
                              <td><strong>{{ $datas->pemilik_harta }}</strong></td>
                              <td><strong>{{ $datas->jenis_harta }}</strong></td>
                              <td>{{ $datas->asal_harta }}</td>
                              <td>{{ $datas->tahun_harta }}</td>
                              <td>{{ $datas->pengurus_harta }}</td>
                              <td>{{ $datas->no_hp }}</td>
                              <td>{{ $datas->email }}</td>
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

