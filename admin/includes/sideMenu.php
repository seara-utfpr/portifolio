<?php


function renderMenu($conn)
{
?><ul class="menu-content">
        <li>         <button onclick="window.location.href='process_form.php'" class="primary-btn">Cadastrar Processo</button> </li>

        <li><button onclick="window.location.href='process_list.php'" class="primary-btn">Listar Processos</button></li>

        <li> <button onclick="window.location.href='macro_form.php'" class="primary-btn">Cadastrar Macroprocesso</button> </li>

        <li> <button onclick="window.location.href='macro_list.php'" class="primary-btn">Listar Macroprocessos</button> </li>

        <li><button onclick="window.location.href='area_form.php'" class="primary-btn">Cadastrar Area</button></li>

        <li><button onclick="window.location.href='area_list.php'" class="primary-btn">Listar Areas</button></li>

        <li><button onclick="window.location.href='subarea_form.php'" class="primary-btn">Cadastrar Sub Area</button><li>

        <li><button onclick="window.location.href='subarea_list.php'" class="primary-btn">Listar Sub Areas</button></li>


    </ul>
<?php
}

?>