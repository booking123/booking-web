<?php

class mainTask extends \Phalcon\CLI\Task
{

    public function mainAction() {
        // echo "\nThis is the default task and the default action \n";
        // var_dump( $this->memcache );
        echo 'test';
    }

    public function loadlocationsAction( $start = 2, $end = 3 ){

	//die("aaa");
	$this->memcache->save("LOCATION_Za", array('79590' => 'Apazapan', '28820' => 'zszapati','28293' => 'San Andrzs Itzapa', '4124' => 'Varna-Zapad', '422' => 'Zapala', '9568' => 'Zapallar', '63137' => 'Zapata') );
	$this->memcache->save("LOCATION_Zap", array('28293' => 'San Andrzs Itzapa', '4124' => 'Varna-Zapad', '422' => 'Zapala', '9568' => 'Zapallar', '63137' => 'Zapata') );
	$this->memcache->save("LOCATION_Zapa", array('79590' => 'Apazapan', '28820' => 'zszapati','422' => 'Zapala', '9568' => 'Zapallar', '63137' => 'Zapata') );
	$this->memcache->save("LOCATION_Zapap", array('79590' => 'Apazapan', '28293' => 'San Andrzs Itzapa', '63137' => 'Zapata') );
	//die("bbb");
	
        while ( $start <= $end ){
            // Instantiate the Query
            $query = new Phalcon\Mvc\Model\Query("
                SELECT
                    SUBSTRING(l.Name, 1, " . $start . ") AS cache_key,
                    count(l.ID) as qty
                FROM
                    Location as l
                group by cache_key
            ", $this->getDI() );

            // Execute the query returning a result if any
            $locations = $query->execute();

            foreach ($locations AS $location){
                if ( trim($location->cache_key) == "" ) continue;

                echo "Key: " . $location->cache_key . "\n";

                $query = new Phalcon\Mvc\Model\Query("
                    SELECT
                        l.ID, l.Name
                    FROM
                        location as l
                    WHERE
                        l.Name like '%" . addslashes( $location->cache_key ) . "%'
                    ORDER BY
                        l.Name
                ", $this->getDI());
                $tmp = $query->execute();

                $tmp_result = array();
                foreach ($tmp AS $k => $v){
                    $tmp_result[$v->ID] = $v->Name;
                }

                $this->memcache->save('LOCATION_' . $location->cache_key, $tmp_result);
                // var_dump($location->cache_key);
                // var_dump($tmp_result);
                // die();
            }
            $start++;
        }
    }

    /**
     * @param array $params
     */
}

?>