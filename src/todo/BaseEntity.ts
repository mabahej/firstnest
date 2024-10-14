import {
    CreateDateColumn,
    UpdateDateColumn,
    DeleteDateColumn,
  } from 'typeorm';
  
  export abstract class BaseEntity {
    @CreateDateColumn() // Définie automatiquement à la date actuelle lors de la création
    createdAt: Date;
  
    @UpdateDateColumn() // Défini automatiquement à la date actuelle lors de la mise à jour
    updatedAt: Date;
  
    @DeleteDateColumn({ nullable: true }) // Défini automatiquement à la date actuelle lors de la suppression logique
    deletedAt: Date | null; // Nullable pour permettre la suppression logique
  }
  