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
            ->setEmail("ced@admin.com")
            ->setLastName("Caudron")
            ->setPassword($hash)
            ->setRoles(['ROLE_ADMIN'])
            ->setActive(true);

        $manager->persist($user);

        $user = new User();
        $hash = $this->encoder->encodePassword($user, "password");
        $user->setFirstName("Cedric")
            ->setEmail("ced@user.com")
            ->setLastName("Caudron")
            ->setPassword($hash)
            ->setRoles(['ROLE_USER'])
            ->setActive(true);

        $manager->persist($user);

        $user = new User();
        $hash = $this->encoder->encodePassword($user, "password");
        $user->setFirstName("Vincent")
            ->setEmail("vincent@admin.com")
            ->setLastName("Brocheton")
            ->setPassword($hash)
            ->setRoles(['ROLE_ADMIN'])
            ->setActive(true);

        $manager->persist($user);

        $user = new User();
        $hash = $this->encoder->encodePassword($user, "password");
        $user->setFirstName("Vincent")
            ->setEmail("vincent@user.com")
            ->setLastName("Brocheton")
            ->setPassword($hash)
            ->setRoles(['ROLE_USER'])
            ->setActive(true);

        $manager->persist($user);


        for ($u = 0; $u < 100; $u++) {
            $user = new User();

            $hash = $this->encoder->encodePassword($user, "password");

            $firstName = $faker->firstName;
            $lastName = $faker->lastName;

            $mail = str_to_noaccent(mb_strtolower($firstName . "." . $lastName));
            $mail = $mail . "@fake.com";

            $user->setFirstName($firstName)
                ->setLastName($lastName)
                ->setPassword($hash)
                ->setRoles(['ROLE_USER'])
                ->setActive(true)
                ->setEmail($mail);


            $manager->persist($user);
        }

        $manager->flush();

    }

}

function str_to_noaccent($str)
{
    $url = $str;
    $url = preg_replace('#Ç#', 'C', $url);
    $url = preg_replace('#ç#', 'c', $url);
    $url = preg_replace('#[èéêë]#', 'e', $url);
    $url = preg_replace('#[ÈÉÊË]#', 'E', $url);
    $url = preg_replace('#[àáâãäå]#', 'a', $url);
    $url = preg_replace('#[@ÀÁÂÃÄÅ]#', 'A', $url);
    $url = preg_replace('#[ìíîï]#', 'i', $url);
    $url = preg_replace('#[ÌÍÎÏ]#', 'I', $url);
    $url = preg_replace('#[ðòóôõö]#', 'o', $url);
    $url = preg_replace('#[ÒÓÔÕÖ]#', 'O', $url);
    $url = preg_replace('#[ùúûü]#', 'u', $url);
    $url = preg_replace('#[ÙÚÛÜ]#', 'U', $url);
    $url = preg_replace('#[ýÿ]#', 'y', $url);
    $url = preg_replace('#Ý#', 'Y', $url);
    $url = preg_replace('# #', '', $url);

    return ($url);
}
