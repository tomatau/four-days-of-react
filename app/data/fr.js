export default {
  messages: {
    products: {
      pageTitle: 'Liste de produits',
      listHeaders: {
        name: 'Nom du produit',
        price: 'Prix',
        quantity: 'Quantité'
      },
      addToCartButton: 'Ajouter au panier'
    },
    header: {
      users: 'Utilisateurs',
      guides: 'Guides',
      protected: 'Privé'
    },
    guides: {
      'page-title': 'Guides'
    },
    protected: {
      'page-title': 'Page protégée'
    },
    profile: {
      'page-title': 'Profil - {fullName}',
      'not-found-page-title': 'User profile not found'
    },
    users: {
      'page-title': 'Utilisateurs',
      title: 'Des utilisateurs au hasard',
      email: 'Adresse email',
      actions: 'Opérations',
      add: 'Ajouter un utilisateur',
      profile: 'Profil'
    },
    routes: {
      users: '/utilisateurs',
      guides: '/guides',
      protected: '/protege',
      profile: '/profil/:seed',
      'login-info': '/info-client'
    }
  }
};
