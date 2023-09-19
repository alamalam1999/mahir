@extends('dashboard.base')

@section('content')

<div class="container-fluid">
            <div class="fade-in">
              <div class="card">
                <div class="card-header">Pembelian</div>
                <div class="card-body">
                  <div class="row">
                    <div class="col-lg-3 col-6">
                    <!-- small box -->
                      <div class="small-box bg-dark">
                        <div class="inner">
                          <h3>78</h3>         
                          <p>Permintaan Barang</p>
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
                          <h3>66</h3>  
                          <p>Permintaan Penawaran Harga</p>
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
                          <h3>33</h3>      
                          <p>Order Pembelian</p>
                        </div>
                        <div class="icon">
                          <i class="fa fa-sharp fa-solid fa-lock"></i>
                        </div>
                        <a href="?hal=akun" class="small-box-footer"><i class="fas fa-sharp fa-solid fa-lock"></i></a>
                      </div>
                    </div>    
                    <div class="col-lg-3 col-6">
                      <!-- small box -->
                      <div class="small-box bg-dark">
                        <div class="inner">
                          <h3>56</h3>
                          <p>Pengiriman Barang Pembelian</p>
                        </div>
                        <div class="icon">
                          <i class="fa fa-sharp fa-solid fa-lock"></i>
                        </div>
                        <a href="?hal=user" class="small-box-footer"><i class="fas fa-sharp fa-solid fa-lock"></i></a>
                      </div>
                    </div>  
                    <div class="col-lg-3 col-6">
                      <!-- small box -->
                      <div class="small-box bg-lime">
                        <div class="inner">
                          <h3>12</h3>
                          <p>Invoice Pembelian</p>
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
                          <h3>55</h3>
                          <p>Hutang Usaha</p>
                        </div>
                        <div class="icon">
                          <i class="fa fa-credit-card"></i>
                        </div>
                        <a href="?hal=user" class="small-box-footer">Detail <i class="fas fa-arrow-circle-right"></i></a>
                      </div>
                    </div>     
                    <div class="col-lg-3 col-6">
                      <!-- small box -->
                      <div class="small-box bg-purple">
                        <div class="inner">
                          <h3>67</h3>
                          <p>Pembayaran Hutang Usaha</p>
                        </div>
                        <div class="icon">
                          <i class="fa fa-percent"></i>
                        </div>
                        <a href="?hal=user" class="small-box-footer">Detail <i class="fas fa-arrow-circle-right"></i></a>
                      </div>
                    </div>
                    <div class="col-lg-3 col-6">
                      <!-- small box -->
                      <div class="small-box bg-yellow">
                        <div class="inner">
                          <h3>78</h3>
                          <p>Uang Muka Pembelian</p>
                        </div>
                        <div class="icon">
                          <i class='fas fa-donate'></i>
                        </div>
                        <a href="?hal=user" class="small-box-footer">Detail <i class="fas fa-arrow-circle-right"></i></a>
                      </div>
                    </div>    
                    <div class="col-lg-3 col-6">
                      <!-- small box -->
                      <div class="small-box bg-dark">
                        <div class="inner">
                          <h3>54</h3>
                          <p>Retur Pembelian</p>
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
                          <h3>67</h3>
                          <p>Daftar Uang Muka Pembelian</p>
                        </div>
                        <div class="icon">
                          <i class='fa fa-list'></i>
                        </div>
                        <a href="?hal=user" class="small-box-footer">Detail <i class="fas fa-arrow-circle-right"></i></a>
                      </div>
                    </div>  
                    <div class="col-lg-3 col-6">
                      <!-- small box -->
                      <div class="small-box bg-info">
                        <div class="inner">
                          <h3>78</h3>
                          <p>Penerimaan Pengembalian (Debit)</p>
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

