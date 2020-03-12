<?php

namespace App\DataFixtures;

use App\Entity\User;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Common\Persistence\ObjectManager;
use Faker\Factory;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;

class AppFixtures extends Fixture
{

    private $encoder;

    public function __construct(UserPasswordEncoderInterface $encoder)
    {
        $this->encoder = $encoder;
    }


    public function load(ObjectManager $manager)
    {
        $faker = Factory::create('fr_FR');

        $user = new User();
        $hash = $this->encoder->encodePassword($user, "password");
        $user->setFirstName("Cedric")
            ->setEmail("ced@test.com")
            ->setLastName("Caudron")
            ->setPassword($hash);

        $manager->persist($user);

        $user = new User();
        $hash = $this->encoder->encodePassword($user, "password");
        $user->setFirstName("Vincent")
            ->setEmail("vincent@test.com")
            ->setLastName("Brocheton")
            ->setPassword($hash);

        $manager->persist($user);


        for ($u = 0; $u <100; $u++)
        {
            $user = new User();

            $hash = $this->encoder->encodePassword($user, "password");

            $user->setFirstName($faker->firstName)
                ->setEmail($faker->email)
                ->setLastName($faker->lastName)
                ->setPassword($hash);

            $manager->persist($user);
        }


        $manager->flush();
    }
}
