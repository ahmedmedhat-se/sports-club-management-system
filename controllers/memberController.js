import Member from '../models/Member.js';

class MemberController {
  static async index(req, res) {
    try {
      const action = req.query.action || 'list';
      const id = req.query.id;
      
      if (action === 'edit' && id) {
        const member = await Member.findById(id);
        if (!member) {
          return res.status(404).render('404', { title: 'Not Found', path: '/members' });
        }
        const membershipTypes = await Member.getMembershipTypes();
        return res.render('members', {
          title: 'Edit Member',
          member,
          membershipTypes,
          action: 'edit',
          path: '/members'
        });
      }
      
      if (action === 'create') {
        const membershipTypes = await Member.getMembershipTypes();
        return res.render('members', {
          title: 'Add Member',
          membershipTypes,
          action: 'create',
          path: '/members'
        });
      }
      
      const members = await Member.findAll();
      res.render('members', {
        title: 'Members',
        members,
        action: 'list',
        path: '/members'
      });
    } catch (error) {
      console.error('Error:', error);
      res.status(500).render('error', { 
        title: 'Error',
        message: 'Failed to load members',
        path: '/members'
      });
    }
  }

  static async create(req, res) {
    try {
      await Member.create(req.body);
      res.redirect('/members?success=Member created successfully');
    } catch (error) {
      console.error('Error:', error);
      res.redirect('/members?error=Failed to create member');
    }
  }

  static async update(req, res) {
    try {
      await Member.update(req.query.id, req.body);
      res.redirect('/members?success=Member updated successfully');
    } catch (error) {
      console.error('Error:', error);
      res.redirect('/members?error=Failed to update member');
    }
  }

  static async delete(req, res) {
    try {
      await Member.delete(req.query.id);
      res.redirect('/members?success=Member deleted successfully');
    } catch (error) {
      console.error('Error:', error);
      res.redirect('/members?error=Failed to delete member');
    }
  }
}

export default MemberController;