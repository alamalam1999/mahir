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
                            <th>Nama</th>
                            <th>Provinsi</th>
                            <th>Kabupaten</th>
                            <th>Daerah</th>
                            <th>No HP</th>
                            <th>Email</th>
                            <th>No telepon</th>
                          </tr>
                        </thead>
                        <tbody>
                          @foreach($data as $datas)
                            <tr>
                              <td><strong>{{ $datas->name }}</strong></td>
                              <td><strong>{{ $datas->provinsi }}</strong></td>
                              <td>{{ $datas->kabupaten }}</td>
                              <td>{{ $datas->daerah }}</td>
                              <td>{{ $datas->no_hp }}</td>
                              <td><strong>{{ $datas->email }}</strong></td>
                              <td>{{ $datas->no_telepon }}</td>
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

