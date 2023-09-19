@extends('dashboard.base')

@section('content')

<div class="container-fluid">
            <div class="fade-in">
              <div class="card">
                <div class="card-header"> Penjualan</div>
                <div class="card-body">
                  <div class="row">
                    <div class="col-lg-3 col-6">
                    <!-- small box -->
                      <div class="small-box bg-dark">
                        <div class="inner">
                          <h3>56</h3>       
                          <p>Penawaran Harga</p>
                        </div>
                        <div class="icon">
                          <i class="fa fa-sharp fa-solid fa-lock"></i>
                        </div>
                        <a href="?hal=unit" class="small-box-footer"><i class="fas fa-sharp fa-solid fa-lock"></i></a>
                      </div>
                    </div>
                    
                    <!-- ./col -->
                    <div class="col-lg-3 col-6">
                      <!-- small box -->
                      <div class="small-box bg-dark">
                        <div class="inner">
                          <h3>34</h3>
              
                          <p>Order Penjualan</p>
                        </div>
                        <div class="icon">
                        <i class='fa fa-sharp fa-solid fa-lock'></i>
                        </div>
                        <a href="?hal=ind" class="small-box-footer"><i class="fas fa-sharp fa-solid fa-lock"></i></a>
                      </div>
                    </div>
              
                    <div class="col-lg-3 col-6">
                      <!-- small box -->
                      <div class="small-box bg-dark">
                        <div class="inner">
                          <h3>78</h3>
              
                          <p>Pengiriman Barang (Penjualan)</p>
                        </div>
                        <div class="icon">
                          <i class="fa fa-sharp fa-solid fa-lock"></i>
                        </div>
                        <a href="?hal=akun" class="small-box-footer"><i class="fas fa-sharp fa-solid fa-lock"></i></a>
                      </div>
                    </div>
              
                    <div class="col-lg-3 col-6">
                      <!-- small box -->
                      <div class="small-box bg-lime">
                        <div class="inner">
                          <h3>12</h3>
                          <p>Invoice Penjualan</p>
                        </div>
                        <div class="icon">
                          <i class="fa fa-clipboard"></i>
                        </div>
                        <a href="?hal=user" class="small-box-footer">Detail <i class="fas fa-arrow-circle-right"></i></a>
                      </div>
                    </div>
              
                    <div class="col-lg-3 col-6">
                      <!-- small box -->
                      <div class="small-box bg-red">
                        <div class="inner">
                          <h3>56</h3>
                          <p>Piutang Usaha</p>
                        </div>
                        <div class="icon">
                          <i class="fa fa-credit-card"></i>
                        </div>
                        <a href="?hal=user" class="small-box-footer">Detail <i class="fas fa-arrow-circle-right"></i></a>
                      </div>
                    </div>
              
                    <div class="col-lg-3 col-6">
                      <!-- small box -->
                      <div class="small-box bg-fuchsia">
                        <div class="inner">
                          <h3>56</h3>
                          <p>Pembayaran Piutang Usaha</p>
                        </div>
                        <div class="icon">
                          <i class="fa fa-shopping-cart"></i>
                        </div>
                        <a href="?hal=user" class="small-box-footer">Detail <i class="fas fa-arrow-circle-right"></i></a>
                      </div>
                    </div>
              
                    <div class="col-lg-3 col-6">
                      <!-- small box -->
                      <div class="small-box bg-warning">
                        <div class="inner">
                          <h3>90</h3>
                          <p>Uang Muka Penjualan</p>
                        </div>
                        <div class="icon">
                          <i class="fa fa-percent"></i>
                        </div>
                        <a href="?hal=user" class="small-box-footer">Detail <i class="fas fa-arrow-circle-right"></i></a>
                      </div>
                    </div>
              
                    <div class="col-lg-3 col-6">
                      <!-- small box -->
                      <div class="small-box bg-dark">
                        <div class="inner">
                          <h3>56</h3>
                          <p>Retur Penjualan</p>
                        </div>
                        <div class="icon">
                          <i class="fa fa-sharp fa-solid fa-lock"></i>
                        </div>
                        <a href="?hal=user" class="small-box-footer"><i class="fas fa-sharp fa-solid fa-lock"></i></a>
                      </div>
                    </div>
              
                    <div class="col-lg-3 col-6">
                      <!-- small box -->
                      <div class="small-box bg-green">
                        <div class="inner">
                          <h3>78</h3>
                          <p>Daftar Uang Muka Penjualan</p>
                        </div>
                        <div class="icon">
                          <i class="fa fa-clipboard"></i>
                        </div>
                        <a href="?hal=user" class="small-box-footer">Detail <i class="fas fa-arrow-circle-right"></i></a>
                      </div>
                    </div>
              
                    <div class="col-lg-3 col-6">
                      <!-- small box -->
                      <div class="small-box bg-info">
                        <div class="inner">
                          <h3>43</h3>
                          <p>Pengembalian Kelebihan (Kredit)</p>
                        </div>
                        <div class="icon">
                          <i class="fa fa-credit-card"></i>
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

