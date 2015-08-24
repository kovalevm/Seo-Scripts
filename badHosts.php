<?php
include_once("dbconnectBlack.php");
$data = $_POST;
//print_r($data);
$passwordERNA = 'aue';

	if (isset($data) && $data['action'] == 'api' && isset($data['hostname']))
	{
		header('Content-Type: application/json; charset=utf-8');
			header('Access-Control-Allow-Origin: *');
		$result = mysql_query("SELECT * FROM blacklistsites WHERE hostname='" . $data['hostname']."' OR hostname='www." . $data['hostname'] ."'");
		//each
		if (!$result) {
			$answer[code] = 0;

			echo json_encode($answer);
			exit;
            echo "Could not successfully run query () from DB: " . mysql_error();
        }

        if (mysql_num_rows($result) == 0) {
			$answer[code] = 1;

			echo json_encode($answer);
			exit;
			echo "No rows found, nothing to print so am exiting";
		}
		$answer[code] = 2;

		echo json_encode($answer);
		exit;
	}

if (isset($data) && $data[passwordERNA] == $passwordERNA) {

       if ($data[siteID] )
        {
           mysql_query("DELETE FROM `blacklistsites` WHERE id=" . $data['siteID'] );

        }

        else if ($data[hostname])
        {
			//echo  date("d-m-Y");
            $que = mysql_query("INSERT INTO `blacklistsites` (`hostname`, `comment`, `date`)
		VALUES ('" . $data['hostname']."','" . $data['comment'] ."','" . date("Y-m-d") ."')");


            //$addAnswer['id'] = mysql_insert_id();
        }
}
?>


<!DOCTYPE html>
<html lang="ru">

<head>
    <meta charset="UTF-8">
    <title>Черный список</title>
    <link rel="stylesheet" href="https://netdna.bootstrapcdn.com/bootstrap/3.3.2/css/bootstrap.min.css">
</head>

<body>
    <div class="container">

        <table class="table">
            <tr>
                <th>id</th>
                <th>Сайт</th>
                <th>я</th>
                <th>Дата добавления</th>

            </tr>

            <?php
                $result = mysql_query("SELECT * FROM blacklistsites",$db);

                if (!$result) {
                    echo "Could not successfully run query () from DB: " . mysql_error();

                }

                if (mysql_num_rows($result) == 0) {
                    echo "No rows found, nothing to print so am exiting";

                }

            //echo $result; die();
                while ($row = mysql_fetch_assoc($result)) {
					echo '<tr>';
                   echo '<td>'. $row[id] .'</td>';
                   echo '<td><a  target="_blank" href="http://' . $row[hostname] . '">' . $row[hostname] . '</a></td>';
                   echo '<td>' . $row[comment] . '</td>';
                   echo '<td>'. $row['date'] .'</td>';
				   echo '</tr>';
                }
            ?>

<!--            <tr>
                <td>1</td>
                <td><a href="https://metrika.yandex.ru/list?">metrika.yandex.ru</a></td>
                <td>Ебанутые на всю голову</td>
                <td>10:08:2015</td>
            </tr>-->
        </table>
<!--        <center><button class="btn">Редактировать</button></center>-->
        <div class="redact">
            <form action="" method="post">
			<div class="form-horizontal">
                    <div class="form-group">
					<label class="col-sm-5 control-label" for="passwordERNA">Для редактирования списка необходимо задать пароль</label>
					<div class="col-sm-5">
                         <input class="form-control" type="password" name="passwordERNA" value="<?=$data[passwordERNA];?>">
						</div>
                    </div>
					</div>
					<table class="table"><tr><td width=50%>
                <div>
				<h3>Добавить сайт в ЧС</h3>
				<div class="form-group">
                    <label for="hostname">Сайт (без http и слешей)</label>
                    <input name="hostname" class="form-control" type="text" placeholder="Например: google.com">
					</div>
					<div class="form-group">
					<label for="comment">Комментарий</label>
                    <input name="comment" type="text" class="form-control">
					</div>
                    <button type="submit" class="btn btn-default">Добавить</button>

                </div>
				</td><td>
				<div>
				<h3>Удалить сайт из ЧС</h3>
                <div class="form-group">
				<label for="siteID">id</label>
                    <input name="siteID" width="100" class="form-control"  type="text">
                </div>
				<button type="submit" class="btn btn-default">Удалить</button>
				</div>
				</td></tr></table>
            </form>
        </div>
    </div>
</body>
</html>
