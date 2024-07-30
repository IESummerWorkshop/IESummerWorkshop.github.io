class Header extends HTMLElement {
    
  connectedCallback() {
    this.innerHTML = `
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
    <header>
    <nav class="navbar navbar-expand-sm bg-body-secondary bg-opacity-50">
      <div class="container-fluid">
        <!-- height 30 rem for mobile / collapse -->
        <a href="/index.html"><img class="logo" src="/assets/img/CUHK_logo.png" alt=""></a>
        <a href="/index.html"><img class="logo mx-2" src="/assets/img/IE_logo.png" alt=""></a>
        <a href="/index.html"><img class="text-logo mt-2" src="/assets/img/CUHK_IE_Black.png" alt=""></a>
        
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarToggler" aria-controls="navbarToggler" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarToggler">
          <ul class="navbar-nav ms-auto mb-2 mb-lg-0 fw-bold">
            <li class="nav-item">
                <a class="nav-link active" aria-current="page" href="/index.html">Home</a>
            </li>
            <li class="nav-item dropdown">
              <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">Topics</a>
              <ul class="dropdown-menu dropdown-menu-end">
                <!--  
                  <li><a class="dropdown-item" href="/bof.html">Buffer Overflow</a></li> 
                  <li><a class="dropdown-item" href="/rop.html">ROP</a></li>
                --!>
                <li><a class="dropdown-item" href="/xss.html">XSS Attack</a></li>
                <li>
                    <a class="dropdown-item" href="/padding-oracle.html">
                      Padding Oracle
                      <span class="badge text-bg-success ms-2">New</span>
                    </a>
                </li>
                <li><a class="dropdown-item" href="/sql-injection.html">SQL Injection</a></li>
                <li><a class="dropdown-item" href="/many-time-pad.html">Many Time Pad</a></li>
                <li>
                    <a class="dropdown-item" href="/save_restore.html">
                      Linux
                      <span class="badge text-bg-warning ms-2">Building</span>
                    </a>
                </li>
              </ul>
            </li>
            <!--
            <li class="nav-item"><a class="nav-link" href="/sql-injection.html">SQL</a></li>
            <li class="nav-item"><a class="nav-link" href="/bof.html">BOF</a></li>
            <li class="nav-item"><a class="nav-link" href="/xss.html">XSS</a></li>
            --!>
    
            <!--
            <li class="nav-item dropdown">
                <button class="btn btn-link nav-link py-2 px-0 px-lg-2 dropdown-toggle d-flex align-items-center" id="bd-theme" type="button" aria-expanded="false" data-bs-toggle="dropdown" data-bs-display="static" aria-label="Toggle theme (light)">
                    <div class="theme-icon-active">
                        <span class="material-icons fs-5 theme-icon opacity-50">light_mode</span>
                    </div>
                  <span class="d-none ms-2" id="bd-theme-text">Toggle theme</span>
                </button>
                <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="bd-theme-text">
                  <li>
                    <button type="button" class="dropdown-item d-flex align-items-center active" data-theme-value="light"  aria-pressed="true">
                        <span class="material-icons fs-5 theme-icon me-1 opacity-50">light_mode</span>Light
                    </button>
                  </li>
                  <li class="">
                    <button type="button" class="dropdown-item d-flex align-items-center" data-theme-value="dark" aria-pressed="false">
                        <span class="material-icons fs-5 theme-icon me-1 opacity-50">nights_stay</span>
                        Dark
                    </button>
                  </li>
                  <li>
                    <button type="button" class="dropdown-item d-flex align-items-center" data-theme-value="auto" aria-pressed="false">
                        <span class="material-icons fs-5 theme-icon me-1 opacity-50">settings</span>
                        System
                    </button>
                  </li>
                </ul>
            </li>
            -->
          </ul>
        </div>
      </div>
    </nav>
    </header>
    `;
}
}

customElements.define('header-component', Header);