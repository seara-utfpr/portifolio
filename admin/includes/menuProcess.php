<?php

function renderMenu($conn){
    $sql = "SELECT * FROM portfolio_de_processos_macroprocesso WHERE parent_id = 0 ORDER BY codigo desc";
    $result = mysqli_query($conn, $sql);

    foreach ($result as $lin) :
        ?> <li><a> <?php echo($lin["descricao"])?> </a></li>
        <?php
        getChildren($lin["id"],$conn);

    endforeach;
    getProcess('0',$conn);

                    
}
function getChildren($parent, $conn){
    $sql = "SELECT * FROM portfolio_de_processos_macroprocesso where parent_id = $parent";
    $result = mysqli_query($conn, $sql);
    if (mysqli_num_rows($result)){
        ?> <ul >
            <?php 
                foreach ($result as $row) : ?>
                    <li> <a><?php echo($row["descricao"])?> </a></li>
                    <?php
                    getChildren($row["id"],$conn);
                endforeach; 
            ?>
        </ul><?php
    }
    getProcess($parent,$conn);

    
    
}

function getProcess($parent, $conn){
    $sql = "SELECT * FROM processo where macro_id = $parent";
    $result = mysqli_query($conn, $sql);
    if (mysqli_num_rows($result)){
        ?> <ul >
            <?php 
                foreach ($result as $row) : ?>
                    <li> <a href="process_view.php?id=<?php echo $row["id"]; ?>" > <?php echo($row["nome_processo"])?></a></li>
                    <?php
                    getChildren($row["id"],$conn);
                endforeach; 
            ?>
        </ul><?php
    }


}

?>