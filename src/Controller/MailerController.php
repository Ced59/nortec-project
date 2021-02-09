<?php

namespace App\Controller;

use Symfony\Component\Mime\Email;
use App\Repository\UserRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\Mailer\MailerInterface;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;

class MailerController extends AbstractController
{
    /**
     * @Route("/resetPassword")
     */
    public function resetPassword(MailerInterface $mailer, UserRepository $repo, EntityManagerInterface $manager)
    {
        $data = file_get_contents("php://input");
        $destinataire = $data;

        try {
            $user = $repo->findByEmail($destinataire);
            if ($user) {
                $resetCode = mt_rand(0, mt_getrandmax());
                $resetCode = uniqid($resetCode);
                $user->setResetPasswordCode($resetCode);
                $prenom = $user->getFirstName();
                $nom = $user->getLastName();
                $manager->persist($user);
                $manager->flush();
                $email = (new Email())
                    ->from('recuperation@deadlines.com')
                    ->to($destinataire)
                    ->subject('Deadlines - Demande de réinitialisation de mot de passe')
                    ->html('
                    <h1>Bonjour ' . $prenom . ' ' . $nom . '</h1>
                    <p>Une demande de changement de mot de passe a été demandée pour votre compte Deadlines</p>
                    <p>Suivez le lien suivant pour continuer la procédure : 
                    <a href="https://localhost:8000/#/reinitialisation/' . $resetCode . '">Changer Votre mot de passe</a>
                    </p>');
                // TODO - CHANGER URL PAR NOM DE DOMAINE POUR PROD
                // TODO - CREER TEMPLATE À RENVOYER (VOIR DOC MAILER ET TWIG)
                $mailer->send($email);
                return $this->json("email envoyé");
            }
        } catch (\Throwable $th) {
            var_dump($th);
            return $this->json("Une erreur est survenu, merci de reessayer plus tard");
        }
        return $this->json("email introuvable");
    }

    /**
     * @Route("/newPassword")
     */
    public function newPassword(UserRepository $repo, EntityManagerInterface $manager, UserPasswordEncoderInterface $encoder)
    {
        $data = json_decode(file_get_contents("php://input"), true);
        $password = $data['newPassword'];
        $code = $data['id'];
        try {
            $user = $repo->findByResetPasswordCode($code);
            if ($user) {
                $hash = $encoder->encodePassword($user, $password);
                $user->setPassword($hash);
                // $user->setPassword($password);
                $user->setResetPasswordCode(NULL);
                $manager->persist($user);
                $manager->flush();
                // var_dump($user->getPassword());
                // var_dump($user->getResetPasswordCode());
                return $this->json("Mot de passe changé avec succès");
            } else {
                return $this->json("Aucun compte n'est lié à ce code de récupération");
            }
        } catch (\Throwable $th) {
            var_dump($th);
            return $this->json("Une erreur est survenu, merci de reessayer plus tard");
        }
    }

    /**
     * @Route("/sendPDF")
     */
    public function sendPDF(MailerInterface $mailer)
    {
        // $data = json_decode(file_get_contents("php://input"), true);
        // var_dump($_POST);
        // // return $this->json(['username' => 'jane.doe']);
        // return $this->json('');

        // $email = (new Email())
        //     ->from('aQuoiCaSert@exemple.com')
        //     // ->to('danyrose1995@gmail.com')
        //     ->to('danyrose1995@gmail.com')
        //     //->cc('cc@example.com')
        //     //->bcc('bcc@example.com')
        //     //->replyTo('fabien@example.com')
        //     //->priority(Email::PRIORITY_HIGH)
        //     ->subject('test deadlines mail')
        //     // ->text('le text du mail de symfony')
        //     ->html('<p>contenu test</p>');

        // $mailer->send($email);
    }
}
