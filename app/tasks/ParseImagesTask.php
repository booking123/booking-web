<?php

/**
 * Created by PhpStorm.
 * User: kostyantin
 * Date: 14.03.14
 * Time: 13:32
 */
class ParseImagesTask extends \Phalcon\CLI\Task{

    public function mainAction() {
        $iSuplierID = 210270;

        $tmp = $this->modelsManager->executeQuery("
SELECT
    ID,
	SupplierID,
	AltID
FROM
    \Product
WHERE
	SupplierID = '".$iSuplierID."'
ORDER BY
	AltID
        ");
        foreach ( $tmp AS $v ){
            // Get images
            var_dump($v); die();
            $tmp_product_images = $this->modelsManager->executeQuery("
                SELECT
                	ID, Name
                FROM
                	\Text
                WHERE
                    ID LIKE '%" . $v->ID . "%'
            ");

            var_dump($tmp_product_images); die();

            foreach ( $tmp_product_images AS $t_v ){
                $tmp_image_name = explode('/', $t_v->Name);

                echo "Inserting: (product_id, name, old_name) VALUES (".$v->ID.", '" . addslashes($tmp_image_name[$tmp_image_name.length - 1]) . "', '" . addslashes($t_v->ID) . "')";
                /*
                $this->modelsManager->executeQuery("
                    INSERT INTO images (product_id, name, old_name) VALUES (".$v->ID.", '" . addslashes($tmp_image_name[$tmp_image_name.length - 1]) . "', '" . addslashes($t_v->ID) . "')
                ");
                */
            }

        }


        // $iAltID = 0;
        // $xml = new SimpleXMLElement( file_get_contents('/Users/unknownartist/Desktop/paxgenerator_house_pictures_ga.xml') );

        /*
        foreach ( $xml->Pictures AS $p_k => $p_v ){
            var_dump($p_v);die();
            $iAltID = $p_v->HouseID;

        }
        */
    }
}
?>