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
                            <th>No</th>
                            <th>Nama Rekening Dari</th>
                            <th>Rekening Dari</th>
                            <th>Rekening Tujuan</th>
                            <th>Nama Rekening Tujuan</th>
                            <th>Nominal</th>
                            <th>Biaya Transfer</th>
                            <th>Deskripsi</th>
                          </tr>
                        </thead>
                        <tbody>
                          <?php $no = 1; ?>
                          @foreach($data as $datas)
                            <tr>
                              <td>{{ $no++ }}</td>
                              <td><strong>{{ $datas->nama_rekening_dari }}</strong></td>
                              <td><strong>{{ $datas->rekening_dari }}</strong></td>
                              <td>{{ $datas->rekening_tujuan }}</td>
                              <td>{{ $datas->nama_rekening_tujuan }}</td>
                              <td>{{ $datas->nominal }}</td>
                              <td><strong>{{ $datas->biaya_transfer }}</strong></td>
                              <td>{{ $datas->deskripsi }}</td>
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

