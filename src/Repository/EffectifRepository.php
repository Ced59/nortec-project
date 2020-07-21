<?php

namespace App\Repository;

use App\Entity\Effectif;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Common\Persistence\ManagerRegistry;

/**
 * @method Effectif|null find($id, $lockMode = null, $lockVersion = null)
 * @method Effectif|null findOneBy(array $criteria, array $orderBy = null)
 * @method Effectif[]    findAll()
 * @method Effectif[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class EffectifRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Effectif::class);
    }

    // /**
    //  * @return Effectif[] Returns an array of Effectif objects
    //  */
    /*
    public function findByExampleField($value)
    {
        return $this->createQueryBuilder('e')
            ->andWhere('e.exampleField = :val')
            ->setParameter('val', $value)
            ->orderBy('e.id', 'ASC')
            ->setMaxResults(10)
            ->getQuery()
            ->getResult()
        ;
    }
    */

    /*
    public function findOneBySomeField($value): ?Effectif
    {
        return $this->createQueryBuilder('e')
            ->andWhere('e.exampleField = :val')
            ->setParameter('val', $value)
            ->getQuery()
            ->getOneOrNullResult()
        ;
    }
    */
}
