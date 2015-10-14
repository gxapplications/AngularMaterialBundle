<?php

namespace GXApplications\AngularMaterialBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Template;

class DemosController extends Controller
{
    /**
     * @Route("/button", name="_demo_button")
     * @Template()
     */
    public function buttonAction()
    {
        return array(
                // ...
            );    }

}
