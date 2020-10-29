<?php

namespace App\Events;

use App\Entity\Report;
use App\Entity\Project;
use App\Repository\ReportRepository;
use Symfony\Component\HttpKernel\KernelEvents;
use Symfony\Component\HttpKernel\Event\ViewEvent;
use ApiPlatform\Core\EventListener\EventPriorities;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\Security\Core\Security;

class ReportChronoSubscriber implements EventSubscriberInterface{

    private $repository;

    public function __construct(ReportRepository $repository)
    {
        $this->repository = $repository;
    }

    public static function getSubscribedEvents()
    {
        return [
            KernelEvents::VIEW => ['setChronoForReport', EventPriorities::PRE_VALIDATE]
        ];
    }

    public function setChronoForReport(ViewEvent $event){
        $report = $event->getControllerResult();
        $method = $event->getRequest()->getMethod();

        if($report instanceof Report && $method === "POST"){
            $project = $report->getProject();
            try {
                $lastChrono = $this->repository->findLastChrono($project);
                $report->setChrono($lastChrono + 1);
            } catch (\Throwable $th) {
                $report->setChrono(1);
            }
        }
    }
}