<?php

namespace GXApplications\AngularMaterialBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;

class DefaultController extends Controller
{
    public function indexAction($name)
    {
        return $this->render('GXAngularMaterialBundle:Default:index.html.twig', array('name' => $name));
    }
}
