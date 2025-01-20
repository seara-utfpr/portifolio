<?php
include_once 'includes/dbh.php';
//editar
if (isset($_POST['user_id'])){
	
    try{
            $id = $_POST["user_id"];
		
		    //Dados sobre o usuario
   		    $sql = "SELECT * FROM portfolio_de_processos_macroprocesso WHERE id = $id ";
            $resultado_query = mysqli_query($conn, $sql);
            $row = mysqli_fetch_assoc($resultado_query);
			
			//dados para o Datalist de macroprocessos pai
			$sql_datalist = "SELECT * FROM `portfolio_de_processos_macroprocesso`";
		    $datalist_values = '<select class="js-example-placeholder-single js-states form-control" id="parent_id" name="parent_id" style="width: 50%">';
			$datalist_values .= '<option></option>';
		    $result_datalist = mysqli_query($conn, $sql_datalist);
      		if ($result_datalist) {
				while ($select_row = mysqli_fetch_assoc($result_datalist)) {
					
					$datalist_values .= '<option  value="'.$select_row['id'].'"';
					
					if($select_row['id']== $row['parent_id']){
						$datalist_values .= ' selected="selected">';
					}
					else{
						$datalist_values .= '>';
					}
					$datalist_values .= $select_row['codigo'].'</option>';
					
				}
			}else{ echo "Error: " . $sql . "<br>" . mysqli_error($conn); }
          
           $datalist_values .= '</select>'; 
		   
		   $resultado = '<div class="main-content">
               <form  action="includes/dbh.insert_user.php"  method="post">
                    <label class="field-description">Nome</label>
					<input type="hidden" name="id" value="'.$id.'">
			        <input type="text" name="codigo" placeholder="Codigo do Macroprocesso." value="'.$row['codigo'].'" required>
                    <br>
					<label class="field-description">Macroprocesso Pai</label> ';					
		  $resultado .= $datalist_values;
		  
		  $sql = "SELECT * FROM `portfolio_de_processos_macroprocesso`";
		  
          $resultado .= '<br/><label class="field-description"> Descrição </label>
		  <input type="text" size="100" name="descricao" value="'.$row['descricao'].'"><br/>
          <button type="submit" name="submit" class="primary-btn"> Atualizar</button>
          </form>
         </div>';
		echo $resultado;
	    }
		catch (PDOException $error) {
            echo $sql . "<br>" . $error->getMessage();
        }
}
else //cadastrar
{
	//dados para o Datalist de macroprocessos pai
			$sql_datalist = "SELECT * FROM `portfolio_de_processos_macroprocesso`";
		    $datalist_values = '<select class="js-example-placeholder-single js-states form-control adicionar" id="parent_id" name="parent_id" style="width: 50%">';
			$datalist_values .= '<option></option>';
		    $result_datalist = mysqli_query($conn, $sql_datalist);
      		if ($result_datalist) {
				while ($select_row = mysqli_fetch_assoc($result_datalist)) {
					
					$datalist_values .= '<option  value="'.$select_row['id'].'">';
					$datalist_values .= $select_row['codigo'].'</option>';
				}
			}else{ echo "Error: " . $sql . "<br>" . mysqli_error($conn); }
          
           $datalist_values .= '</select>';
	
		   $resultado = '<div class="main-content">
               <form action="includes/dbh.insert_macro.php"  method="post">
			   		<label for="nomeprocesso" class="field-description">Nome (*)</label>
				    <input type="text" name="codigo" placeholder="Nome do Macroprocesso " id="nomeprocesso" value="" required>
                    <div class="invalid-feedback">
				 			Indique o nome para o Macroprocesso..
			   		</div>			        
                    <br>
                    <label class="field-description"> Macroprocesso Pai</label> ';
           $resultado .= $datalist_values;        
           $resultado .= '<br/><label class="field-description"> Descrição </label>
		    <input placeholder="Descrição" type="text" size="100" name="descricao" value=""><br/>
            <button type="submit" name="submit" class="primary-btn"> Cadastrar</button>
            </form>
		    (*) - Campo Obrigatório
          </div>';
		  
		echo $resultado;
}
?>