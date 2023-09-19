@extends('dashboard.base')

@section('content')

<div class="container-fluid">
            <div class="fade-in">
              <div class="card">
                <div class="card-header">Headings</div>
                <div class="card-body">
                  <div class="row">
			
                    <div class="col-lg-3 col-6">
                    <!-- small box -->
                      <div class="small-box bg-dark">
                        <div class="inner">
                          <h3>34</h3>
              
                          <p>Data Produk</p>
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
                          <h3>45</h3>
              
                          <p>Pemakaian/Penyesuaian Barang</p>
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
                          <h3>44</h3>
              
                          <p>Pemindahan Barang</p>
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
                          <h3>11</h3>
                          <p>Transfer Barang Antar Gudang</p>
                        </div>
                        <div class="icon">
                          <i class="fa fa-sharp fa-solid fa-lock"></i>
                        </div>
                        <a href="?hal=user" class="small-box-footer"><i class="fas fa-sharp fa-solid fa-lock"></i></a>
                      </div>
                    </div>
              
                    <div class="col-lg-3 col-6">
                      <!-- small box -->
                      <div class="small-box bg-dark">
                        <div class="inner">
                          <h3>56</h3>
                          <p>Stock Opname</p>
                        </div>
                        <div class="icon">
                          <i class="fa fa-sharp fa-solid fa-lock"></i>
                        </div>
                        <a href="?hal=user" class="small-box-footer"><i class="fa fa-sharp fa-solid fa-lock"></i></a>
                      </div>
                    </div>
              
                    <div class="col-lg-3 col-6">
                      <!-- small box -->
                      <div class="small-box bg-red">
                        <div class="inner">
                          <h3>77</h3>
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
                          <h3>55</h3>
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
                          <h3>88</h3>
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
                          <h3>23</h3>
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
                          <h3>66</h3>
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
                          <h3>67</h3>
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
                  <!-- /.row -->
                </div>
              </div>       
            </div>
</div>


@endsection

@section('javascript')
  
@endsection