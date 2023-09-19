@extends('dashboard.base')

@section('content')

<div class="container-fluid">
            <div class="fade-in">
              <div class="card">
                <div class="card-header"> Kas & Bank</div>
                <div class="card-body">
                  
                  <div class="row">
			
                    <div class="col-lg-3 col-6">
                    <!-- small box -->
                      <div class="small-box bg-blue">
                        <div class="inner">
                          <h3>234</h3>
              
                          <p>Kas Keluar</p>
                        </div>
                        <div class="icon">
                          <i class='fa fa-arrow-right'></i>
                        </div>
                        <a href="?hal=unit" class="small-box-footer">Detail <i class="fa fa-arrow-circle-right"></i></a>
                      </div>
                    </div>
                    
                    <!-- ./col -->
                    <div class="col-lg-3 col-6">
                      <!-- small box -->
                      <div class="small-box bg-info">
                        <div class="inner">
                          <h3>567</h3>
              
                          <p>Kas Masuk</p>
                        </div>
                        <div class="icon">
                        <i class='fa fa-arrow-left'></i>
                        </div>
                        <a href="?hal=ind" class="small-box-footer">Detail <i class="fas fa-arrow-circle-right"></i></a>
                      </div>
                    </div>
              
              
                    <div class="col-lg-3 col-6">
                      <!-- small box -->
                      <div class="small-box bg-purple">
                        <div class="inner">
                          <h3>543</h3>
                          <p>Transfer Kas</p>
                        </div>
                        <div class="icon">
                          <i class='fas fa-cash-register'></i>
                        </div>
                        <a href="?hal=user" class="small-box-footer">Detail <i class="fas fa-arrow-circle-right"></i></a>
                      </div>
                    </div>
              
                    <div class="col-lg-3 col-6">
                      <!-- small box -->
                      <div class="small-box bg-orange">
                        <div class="inner">
                          <h3>234/h3>
                          <p>Rekonsiliasi Bank</p>
                        </div>
                        <div class="icon">
                          <i class='fa fa-building'></i>
                        </div>
                        <a href="?hal=user" class="small-box-footer">Detail <i class="fas fa-arrow-circle-right"></i></a>
                      </div>
                    </div>
              
                    <div class="col-lg-3 col-6">
                      <!-- small box -->
                      <div class="small-box bg-green">
                        <div class="inner">
                          <h3>890</h3>
                          <p>Giro Masuk</p>
                        </div>
                        <div class="icon">
                          <i class='fa fa-arrow-down'></i>
                        </div>
                        <a href="?hal=user" class="small-box-footer">Detail <i class="fas fa-arrow-circle-right"></i></a>
                      </div>
                    </div>
              
                    <div class="col-lg-3 col-6">
                      <!-- small box -->
                      <div class="small-box bg-red">
                        <div class="inner">
                          <h3>789</h3>
                          <p>Giro Keluar</p>
                        </div>
                        <div class="icon">
                          <i class='fa fa-arrow-up'></i>
                        </div>
                        <a href="?hal=user" class="small-box-footer">Detail <i class="fas fa-arrow-circle-right"></i></a>
                      </div>
                    </div>
              
              
                    <!-- ./col -->
                  </div>
                </div>
              </div>
             
            </div>
          </div>

@endsection


@section('javascript')
    <script src="{{ asset('js/colors.js') }}"></script>
@endsection

