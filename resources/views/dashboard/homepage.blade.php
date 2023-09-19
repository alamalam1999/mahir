@extends('dashboard.authBase')
@section('content')
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-md-4">
          <div class="card-group">
            <div class="card p-4">
              <div class="card-body text-center">
                <div>
                  <img src="{{ url('/assets/brand/mahir-logo.png') }}" >
                  <h4 class="login-box-msg">Mahir Accounting</h4>
                </div>         
                <p class="text-muted">Sign In to your account</p>
                <form method="POST" action="{{ route('login') }}">
                    @csrf
                    <div class="input-group mb-3">
                    <div class="input-group-prepend">
                      <span class="input-group-text">
                        <svg class="c-icon">
                          <use xlink:href="assets/icons/coreui/free-symbol-defs.svg#cui-user"></use>
                        </svg>
                      </span>
                    </div>
                    <input class="form-control" type="text" placeholder="{{ __('E-Mail Address') }}" name="email" value="{{ old('email') }}" required autofocus>
                    </div>
                    <div class="input-group mb-4">
                    <div class="input-group-prepend">
                      <span class="input-group-text">
                        <svg class="c-icon">
                          <use xlink:href="assets/icons/coreui/free-symbol-defs.svg#cui-lock-locked"></use>
                        </svg>
                      </span>
                    </div>
                    <input class="form-control" type="password" placeholder="{{ __('Password') }}" name="password" required>
                    </div>
                    <?php
                      $min_number = 1;
                      $max_number = 15;
                  // generating random numbers
                      $angka1 = mt_rand($min_number, $max_number);
                      $angka2 = mt_rand($min_number, $max_number);
                      ?>
                  <input type="hidden" name="angka1" value="<?=$angka1?>">
                  <input type="hidden" name="angka2" value="<?=$angka2?>"> 

                <div class="input-group mb-3">
                  <label class="form-control"><?=$angka1." + ".$angka2 ?> =  ? </label>
                  <input type="number" class="form-control" name="hasil" placeholder="Capthca">
                  <div class="input-group-append">
                    <div class="input-group-text">
                      <span class="fas fa-calculator"></span>
                    </div>
                  </div>
                </div>
                    <div class="row">
                      <div class="col-6">
                          <button class="btn btn-primary px-4" type="submit">{{ __('Login') }}</button>
                      </div>
                      </form>
                      
                      <div class="col-6">
                          <a href="{{ route('password.request') }}" class="btn btn-link px-0">{{ __('Forgot Your Password?') }}</a>
                      </div>
                    </div>
              </div>
                @if($errors->any()) 
                <div class="alert alert-warning alert-dismissible fade show" role="alert">
                  Capthca salah, silahkan jawab kembali dengan benar.
                  <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                @endif
            </div>  
          </div>
        </div>
      </div>
    </div>
@endsection
@section('javascript')
@endsection