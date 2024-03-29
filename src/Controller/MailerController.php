<?php

namespace App\Controller;

use Symfony\Component\Mime\Email;
use App\Repository\UserRepository;
use Symfony\Component\Dotenv\Dotenv;
use Doctrine\ORM\EntityManagerInterface;
use PhpParser\Node\Stmt\TryCatch;
use Symfony\Component\Mailer\MailerInterface;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;

class MailerController extends AbstractController
{
    /**
     * @Route("/api/resetPassword")
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
                    <a href="'.$_ENV['DOMAINE_URL'].'#/reinitialisation/' . $resetCode . '">Changer Votre mot de passe</a>
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
     * @Route("/api/newPassword")
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
     * @Route("/api/sendPDF")
     */
    public function sendPDF(MailerInterface $mailer)
    {
        $file = $_FILES['pdf']['tmp_name'];
        $nomProjet = $_POST['projectName'];
        $chronoRapport = $_POST['reportChrono'];
        $destinataires = $_POST['destinataires'];
        $destinataires = explode(',', $destinataires);

        try {
            for ($i = 0; $i < count($destinataires); $i++) {
                $email = (new Email())
                    ->from('rapport_pdf@deadlines.com')
                    ->to($destinataires[$i])
                    ->subject('Deadlines - Rapport n°' . $chronoRapport . ' du project ' . $nomProjet)
                    ->attach(fopen($file, 'r', './'), 'rapport.pdf')
                    ->html('<h1>Ci-joint le rapport n°' . $chronoRapport . ' du project ' . $nomProjet . '</h1>');

                $mailer->send($email);
            }
            $emailEnvoye = true;
        } catch (\Throwable $th) {
            var_dump(($th));
            $emailEnvoye = false;
        }

        return $this->json(['send'=>$emailEnvoye]);
    }

    /**
     * @Route("/api/adminValidation")
     */
    public function adminValidation (MailerInterface $mailer)
    {
        $nomProjet = $_POST['projectName'];
        $chronoRapport = $_POST['reportChrono'];
        $reportLink=$_POST['reportLink'];
        $destinataires = $_POST['destinataires'];
        $destinataires = explode(',', $destinataires);

        try {
            for ($i = 0; $i < count($destinataires); $i++) {
                $email = (new Email())
                    ->from('notification@deadlines.com')
                    ->to($destinataires[$i])
                    ->subject('Deadlines - Rapport n°' . $chronoRapport . ' du project ' . $nomProjet)
                    ->html('<h1>Project ' . $nomProjet . '</h1>
                    <p>Le raport n°'.$chronoRapport.' est en attente de validation</p>
                    <a href='.$reportLink.'>Lien du rapport</a>
                    ');

                $mailer->send($email);
            }
            $emailEnvoye = true;
        } catch (\Throwable $th) {
            var_dump(($th));
            $emailEnvoye = false;
        }

        return $this->json(['send'=>$emailEnvoye]);
    }

    /**
     * @Route("/api/newUser")
     */

     public function newUSer (MailerInterface $mailer){
         $userMail = $_POST['userMail'];
         $userPassword = $_POST['password'];
         $destinataire = $_POST['userMail'];

         try {
             $email = (new Email())
             ->from('notification@deadlines.com')
             ->to($destinataire)
             ->subject("Création de votre compte DeadLines")
             ->html("<h1>Bienvenue</h1>
             <p>Votre compte DeadLine à été créer par un administrateur, vous pouvez vous connecter à partir de 
             <a href=".$_ENV['DOMAINE_URL'].">cette adresse</a> avec comme identifiant</p>
             <p>Email : ".$userMail."</p>
             <p>Mot de passe: ".$userPassword."</p>
             <p> Veuillez changer le mot passe après votre connection</p>
             ");
             $mailer->send($email);
             return $this->json('email envoyé');
         } catch (\Throwable $th) {
             //throw $th;
         }
     }
}
