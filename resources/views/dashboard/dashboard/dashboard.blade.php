@extends('dashboard.base')

@section('content')

        <div class="container">
                <div class="card">
                    <div class="card-header">
                      <h5>DASHBOARD</h5>
                    </div>
                    <div class="card-body">
                      <div class="row">
                        <div class="col">
                          <canvas id="myChart" width="auto" height="300"></canvas>
                        </div>
                        <div class="col">
                          <div class="row">
                              <div class="col">
                                <canvas id="myDart" width="auto" height="100"></canvas>
                              </div>
                          </div>
                          <div class="row">
                            <div class="col">
                              <canvas id="myPart" width="auto" height="100"></canvas>
                            </div>
                          </div>
                          <div class="row">
                            <div class="col">
                              <canvas id="myZart" width="auto" height="100"></canvas>
                            </div>
                          </div>
                        </div>
                        <div class="col-1">
                           <div class="row">
                                <div class="small-box bg-primary" 
                                style="width: 100%;
                                    height: 80px;
                                    font-size: 13px;">
                                  <div class="inner">  
                                    Laba Rugi                       
                                  </div>
                                  <a href="http://127.0.0.1:8000/data-alamat-penjualan" class="small-box-footer">Detail <i class="fa fa-arrow-circle-right"></i></a>
                                </div>
                           </div>
                           <div class="row">
                            <div class="small-box bg-danger" 
                            style="width: 100%;
                                  height: 80px;
                                  font-size: 13px;">
                              <div class="inner">  
                                Neraca
                              </div>
                              <a href="http://127.0.0.1:8000/data-alamat-penjualan" class="small-box-footer">Detail <i class="fa fa-arrow-circle-right"></i></a>
                            </div>
                           </div>
                           <div class="row">
                            <div class="small-box bg-success" 
                            style="width: 100%;
                                  height: 80px;
                                  font-size: 13px;">
                              <div class="inner">  
                                Saldo Bank
                              </div>
                              <a href="http://127.0.0.1:8000/data-alamat-penjualan" class="small-box-footer">Detail <i class="fa fa-arrow-circle-right"></i></a>
                            </div>
                           </div>
                           <div class="row">
                            <div class="small-box bg-warning" 
                            style="width: 100%;
                                  height: 80px;
                                  font-size: 13px;">
                              <div class="inner">  
                                Analisa Rasio
                              </div>
                              <a href="http://127.0.0.1:8000/data-alamat-penjualan" class="small-box-footer">Detail <i class="fa fa-arrow-circle-right"></i></a>
                            </div>
                           </div>
                           <div class="row">
                            <div class="small-box bg-secondary" 
                            style="width: 100%;
                                  height: 80px;
                                  font-size: 13px;">
                              <div class="inner">  
                                Break Even
                              </div>
                              <a href="http://127.0.0.1:8000/data-alamat-penjualan" class="small-box-footer">Detail <i class="fa fa-arrow-circle-right"></i></a>
                            </div>
                           </div>
                        </div>
                      </div>
                    </div>
                </div> 
        </div>

<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
<script src="{{ asset('assets/js/pages/admin/dashboard.js') }}"></script>

@endsection


@section('javascript')

@endsection

