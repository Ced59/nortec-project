<?php

namespace App\Events;

use Lexik\Bundle\JWTAuthenticationBundle\Event\JWTCreatedEvent;

class JwtCreatedSubscribers {
    public function updateJwtData(JWTCreatedEvent $event) {

        // Récupérer le user
        $user = $event->getUser();

        $data = $event->getData();
        $data['id'] = $user->getId();
        $data['firstName'] = $user->getFirstName();
        $data['lastName'] = $user->getLastName();

        $event->setData($data);

    }
}