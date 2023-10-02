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
                            <th>Nama Mata Uang</th>
                            <th>Jenis Mata uang</th>
                            <th>Pecahan Uang</th>
                            <th>Tahun Pecahan</th>
                            <th>Dari Bank Apa</th>
                            <th>Deskripsi</th>
                          </tr>
                        </thead>
                        <tbody>
                          <?php $no = 1; ?>
                          @foreach($data as $datas)
                            <tr>
                              <td>{{ $no++ }}</td>
                              <td><strong>{{ $datas->nama_mata_uang }}</strong></td>
                              <td><strong>{{ $datas->jenis_mata_uang }}</strong></td>
                              <td>{{ $datas->pecahan_uang }}</td>
                              <td>{{ $datas->tahun_pecahan }}</td>
                              <td>{{ $datas->dari_bank_apa }}</td>
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

