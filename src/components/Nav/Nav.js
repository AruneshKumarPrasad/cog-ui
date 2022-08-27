import React from 'react'

function Nav() {
  
  return (
    
    <div style={{width:"100%",top:"0",position:"absolute"}}>
    <nav class="navbar navbar-expand-lg bg-dark">
    <div class="container-fluid ">
      <a class="navbar-brand text-light" href="#">Cognida.ai</a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse justify-content-end " id="navbarNav">
        <ul class="navbar-nav ">
          <li class="nav-item">
            <a class="nav-link active text-light" aria-current="page" href="#">Upload</a>
          </li>
          <li class="nav-item">
            <a class="nav-link text-light" href="#">List</a>
          </li>
          <li class="nav-item">
            <a class="nav-link text-light" href="#">Profile</a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
  </div>
  )
}

export default Nav