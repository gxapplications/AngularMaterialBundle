<?php

namespace GXApplications\AngularMaterialBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Template;
use Symfony\Component\HttpFoundation\Request;

class DemosController extends Controller
{
    /**
     * @Route("/gridlist", name="_demo_gridlist")
     * @Template()
     */
    public function gridlistAction()
    {

        return [

        ];
    }

    /**
     * @Route("/gridlist_card", name="_demo_gridlist_card")
     * @Template()
     */
    public function gridlistCardAction(Request $request)
    {

        return [
            'id' => $request->request->get('id')
        ];
    }
}
