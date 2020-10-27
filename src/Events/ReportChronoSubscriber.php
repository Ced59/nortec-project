<?php

namespace App\Events;

use ApiPlatform\Core\EventListener\EventPriorities;
use App\Repository\ReportRepository;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\HttpKernel\Event\ViewEvent;
use Symfony\Component\HttpKernel\KernelEvents;
use Symfony\Component\Security\Core\Security;

class ReportChronoSubscriber implements EventSubscriberInterface{

    private $security;
    private $repository;

    public function __construct(Security $security, ReportRepository $repository)
    {
        $this->security = $security;
        $this->repository = $repository;
    }

    public static function getSubscribedEvents()
    {
        return [
            KernelEvents::VIEW => ['setChronoForReport', EventPriorities::PRE_VALIDATE]
        ];
    }

    public function setChronoForReport(ViewEvent $event){
        // dd("hello");
    }
}
//TOTO à revoir